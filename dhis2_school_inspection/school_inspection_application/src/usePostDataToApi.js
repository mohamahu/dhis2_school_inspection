import { useDataMutation } from '@dhis2/app-runtime';

const postDataMutation = {
    resource: 'tracker',
    type: 'create',
    data: ({ payload }) => payload,
};

export const usePostDataToApi = () => {
    const [mutate, { loading, error, data }] = useDataMutation(postDataMutation);

    const postData = async (props) => {
        const payload = {
            events: [
                {
                    program: 'UxK2o06ScIe',
                    orgUnit: props.schoolId || 'oXTcmBQ3JjJ', // Default orgUnit if none provided
                    programStage: 'eJiBjm9Rl7E',
                    occurredAt: props.date || '2024-11-14T00:00:00.000',
                    status: 'COMPLETED',
                    dataValues: [
                        { dataElement: 'IKiSAA19Xvl', value: props.electricSupply },
                        { dataElement: 'Nvp4hIbXrzF', value: props.computerLab },
                        { dataElement: 'jkkdC9567rC', value: props.laboratory },
                        { dataElement: 'n9KwS4rY2HC', value: props.handWashingFacilities },
                        { dataElement: 'Y6DQqwTdhiZ', value: props.library },
                        { dataElement: 'ya5SyA5hej4', value: props.numberOfClassrooms },
                        { dataElement: 'XThfmg6f2oC', value: props.playground },
                        { dataElement: 'og5vY9iQMpc', value: props.diningArea },
                        { dataElement: 'dnIEQBiLLCN', value: props.totalTeachers },
                        { dataElement: 'wxTtIsgNELq', value: props.femaleTeacher },
                        { dataElement: 'yTTiUnVgnUt', value: props.maleTeacher },
                        { dataElement: 'iSdSVb5oaeo', value: props.totalStudents },
                        { dataElement: 'WH1p6OiHJlc', value: props.femaleStudent },
                        { dataElement: 'ToWGgphTARU', value: props.maleStudent },
                        { dataElement: 'I13NTyLrHBm', value: props.amountToiletsTeachers },
                        { dataElement: 'vJt2qU3Cmme', value: props.amountToiletsStudent },
                        { dataElement: 'TB2AD2fBgOS', value: props.amountErasers },
                        { dataElement: 'pV7dFvXdHCk', value: props.amountPencil },
                        { dataElement: 'eCVO6dhfr7v', value: props.amountNotebooks },
                        { dataElement: 'xYi0e2ZjWoU', value: props.amountTextbooks },
                        { dataElement: 'kZxE8UEOnXS', value: props.numberDesk },
                    ],
                },
            ],
        };

        try {
            await mutate({ payload });
            alert('Data submitted successfully!');
        } catch (err) {
            console.error('Error during submission:', err);
            alert('Failed to submit data. Check the logs for details.');
        }
    };

    return { postData, loading, error, data };
};
