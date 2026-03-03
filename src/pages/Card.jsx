import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Basic1 from "../templates/Basic1";
import Basic2 from "../templates/Basic2";

const Card = () => {
    const { username } = useParams();
    const [data, setData] = useState(null);

    console.log("user data:", data);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}clientData/${username}.json`)
            .then((res) => {
                if (!res.ok) throw new Error("User not found");
                return res.json();
            })
            .then((json) => setData(json))
            .catch(() => setData(null));
    }, [username]);

    console.log("username:", username);


    if (!data)
        return <h2 style={{ textAlign: "center" }}>User Not Found</h2>;

    const templates = {
        Basic1: Basic1,
        Basic2: Basic2,
    };

    const SelectedTemplate = templates[data.template];

    if (!SelectedTemplate)
        return <h2 style={{ textAlign: "center" }}>Template Not Found</h2>;

    return <SelectedTemplate data={data} />;
};

export default Card;