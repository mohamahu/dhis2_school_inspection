import { useDataEngine, useDataMutation, useDataQuery } from '@dhis2/app-runtime';
import { Button, CircularLoader } from '@dhis2/ui';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/createNewScholl.css";

const CLUSTER_QUERY = {
	clusters: {
		resource: 'organisationUnits/RlPlK44dtoo',
		params: {
			fields: 'id,displayName,children[id,displayName]',
		},
	},
};

const CREATE_ORG_UNIT_MUTATION = {
	resource: 'organisationUnits',
	type: 'create',
	data: ({ payload }) => payload,
};

const UPLOAD_FILE_MUTATION = {
	resource: 'fileResources',
	type: 'create',
	data: ({ file }) => {
		const formData = new FormData();
		formData.append('file', file);
		const payload = {};
		formData.forEach((value, key) => {
			payload[key] = value;
		});
		return payload;
	},
	params: {
		domain: 'ORG_UNIT'
	}
};

const PATCH_ORG_UNIT_MUTATION = {
	resource: 'organisationUnits',
	type: 'update',
	data: ({ data }) => data,
	headers: {
		'Content-Type': 'application/json',
	},
	params: {
		method: 'PATCH', // Explicitly set PATCH in the headers (use 'PATCH' method)
	},
};

const CreateNewSchool = () => {
    const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		shortName: '',
		openingDate: '',
	});
	const [locationData, setLocationData] = useState({
		latitude: null,
		longitude: null,
		country: '',
		region: '',
	});
	const [responseMessage, setResponseMessage] = useState('');
	const [file, setFile] = useState(null);
	const fileInputRef = useRef(null);
	const [selectedCluster, setSelectedCluster] = useState('');
	const [loading, setLoading] = useState(false);

	const [createOrgUnit] = useDataMutation(CREATE_ORG_UNIT_MUTATION);
	const [uploadFile] = useDataMutation(UPLOAD_FILE_MUTATION);
	const [patchOrgUnit] = useDataMutation(PATCH_ORG_UNIT_MUTATION);
	const engine = useDataEngine();

	const { data: clusterData, error: clusterError, loading: clusterLoading } = useDataQuery(CLUSTER_QUERY);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const cancelFileSelection = () => {
		setFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const fetchLocation = () => {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords;
				try {
					const response = await fetch(
						`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
					);
					const locationInfo = await response.json();
					setLocationData({
						latitude,
						longitude,
						country: locationInfo.countryName,
						region: locationInfo.principalSubdivision,
					});
				} catch (error) {
					console.error('Error fetching location data:', error);
				}
			},
			(error) => {
				console.error('Geolocation error:', error);
			}
		);
	};

	const resetForm = () => {
		setFormData({
			name: '',
			shortName: '',
			openingDate: '',
		});
		setLocationData({
			latitude: null,
			longitude: null,
			country: '',
			region: '',
		});
		setFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
		setResponseMessage('');
		setSelectedCluster('');
	};

	const handleSubmit = async (e) => {
		console.log("File object:", file);
		e.preventDefault();
	
		if (!selectedCluster) {
			setResponseMessage('Please select a cluster.');
			return;
		}
	
		const payload = {
			name: formData.name,
			shortName: formData.shortName,
			openingDate: formData.openingDate,
			level: 5,
			parent: { id: selectedCluster },
			geometry: {
				type: 'Point',
				coordinates: [
					parseFloat(locationData.longitude),
					parseFloat(locationData.latitude),
				],
			},
		};
	
		try {
			setLoading(true);
			console.log('Submitting organization unit payload:', payload);
	
			// Step 1: Create the organization unit
			const orgUnitResponse = await createOrgUnit({ payload });
			console.log('Organization unit creation response:', orgUnitResponse);
	
			const orgUnitId = orgUnitResponse?.response?.uid;
			if (!orgUnitId) {
				throw new Error('Failed to create organization unit. No UID received.');
			}
			console.log('Created school ID:', orgUnitId);
	
			if (file) {
				// Step 2: Upload the file
				const fileUploadResponse = await uploadFile({ file });
				console.log("File resource response:", fileUploadResponse);
	
				if (fileUploadResponse.httpStatus !== "Accepted" || !fileUploadResponse.response?.fileResource?.id) {
					throw new Error(`File resource upload failed: ${JSON.stringify(fileUploadResponse)}`);
				}
	
				const fileResourceId = fileUploadResponse.response.fileResource.id;
				console.log("Uploaded file resource ID:", fileResourceId);
	
				// Step 3: PATCH the organization unit with the uploaded file using fetch
				const patchData = {
					image: fileResourceId  // Directly passing the ID string
				};
	
				console.log('Associating image', fileResourceId, 'with organization unit', orgUnitId);
	
				const response = await fetch(`http://localhost:9999/api/40/organisationUnits/${orgUnitId}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(patchData)
				});
	
				// If response is empty (204 No Content), no need to parse as JSON
				if (response.ok) {
					// Check if the response body is not empty
					if (response.status !== 204) {
						const responseData = await response.json();
						console.log('Image association result:', responseData);
					} else {
						console.log('Image associated successfully with no response content');
					}
				} else {
					throw new Error(`Failed to associate image: ${response.statusText}`);
				}
			}
	
			setResponseMessage('School created successfully with the provided image!');
			resetForm(); // Reset the form after successful submission
		} catch (error) {
			console.error('Error during submission:', error);
			setResponseMessage(`Failed to create school: ${error.message}`);
		} finally {
			setLoading(false);
		}
        navigate('/Success'); // Replace with the desired path
	};
	
	
	

	if (clusterLoading) return <CircularLoader />;
	if (clusterError) return <p>Error loading clusters: {clusterError.message}</p>;

	const clusters = clusterData?.clusters?.children || [];

	return (
		<div className="form-container">
            <h2 className="form-title">Create a New School</h2>
			<form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label className="form-label">
            Select Cluster <span className="mendatory"> *</span>
						<select
                        className="form-select"
							value={selectedCluster}
							onChange={(e) => setSelectedCluster(e.target.value)}
							required
						>
							<option value=''>Select a cluster</option>
							{clusters.map((cluster) => (
								<option key={cluster.id} value={cluster.id}>
									{cluster.displayName}
								</option>
							))}
						</select>
					</label>
				</div>
              
				  <div className="form-group">
                    <label className="form-label">
                        Name of the school <span className="mendatory"> *</span>
                        <input
                            className="form-input"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
				<div className="form-group">
                    <label className="form-label">
                        Short name of the school <span className="mendatory"> *</span>
                        <input
                            className="form-input"
                            type="text"
                            name="shortName"
                            value={formData.shortName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Opening Date <span className="mendatory"> *</span>
                        <input
                            className="form-input"
                            type="date"
                            name="openingDate"
                            value={formData.openingDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                
				<div className="form-group">
    <label className="form-label">
        Upload Image:
        <input
            ref={fileInputRef}
            className="form-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
        />
    </label>
    {file && (
        <div className="file-info">
            <p className="file-name">{file.name}</p>
            <button
                type="button"
                className="btn btn-secondary btn-small delete-btn"
                onClick={cancelFileSelection}
            >
                Delete
            </button>
        </div>
    )}
    
</div>
<div className="form-group">
				<Button className="btn btn-primary" onClick={fetchLocation}>Fetch location</Button>
				{locationData.latitude && (
					<div className="location-info">
						<p>Latitude: {locationData.latitude}</p>
						<p>Longitude: {locationData.longitude}</p>
						<p>Country: {locationData.country}</p>
						<p>Region: {locationData.region}</p>
					</div>
				)}
                </div>
<div className="button-container">
            <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? <CircularLoader small /> : 'Create School'}
            </button>
        </div>
			</form>
			{responseMessage && <p>{responseMessage}</p>}
		</div>
	);
};

export default CreateNewSchool;
