import Api from "./index"

interface Relation {
    id_channel: string,
    id_profile: string
}

export const incrementChannel = async (id_channel: string, id_profile: string): Promise<Relation | boolean> => {
    try {
        // 👇️ const data: CreateUserResponse
        const { data } = await Api.put<Relation>(
            'channelxprofile',
            { id_channel: id_channel, id_profile: id_profile },
        );

        console.log(JSON.stringify(data, null, 4));

        return data;

    } catch (error) {
        console.log('unexpected error: ', error);
        return false
    }
}

