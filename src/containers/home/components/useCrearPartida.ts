import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useCrearPartida = () => {
    const MAX_LENGTH_PARTIDA_NAME = 50;
    const MAX_LENGTH_USERNAME = 50;
    const { toast, dismiss } = useToast();

    const [partidaname, setPartidaname] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        dismiss();
    }, [partidaname, username]);

    const showToast = (message: string) => {
        toast({
            title: `CUIDADO:`,
            description: message,
            variant: "destructive",
        });
    };

    const changePartidaName = (name: string) => {
        if (name.length > MAX_LENGTH_PARTIDA_NAME) {
            showToast("El nombre de la partida es muy largo.");
            return;
        }
        setPartidaname(name);
    };

    const changeUsername = (name: string) => {
        if (name.length > MAX_LENGTH_USERNAME) {
            showToast("El nombre de usuario es muy largo.");
            return;
        }
        setUsername(name);
    };

    const checkFields = () => {
        if (username === "" && partidaname === "") {
            showToast(
                "El nombre de usuario y el nombre de la partida no pueden estar vacios."
            );
            return false;
        }
        if (username === "") {
            showToast("El nombre de usuario no puede estar vacio.");
            return false;
        }
        if (partidaname === "") {
            showToast("El nombre de la partida no puede estar vacio.");
            return false;
        }
        return true;
    };

    return {
        partidaname,
        username,
        dismiss,
        changePartidaName,
        changeUsername,
        checkFields,
    };
};
