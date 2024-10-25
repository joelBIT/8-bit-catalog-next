import { ReactElement } from "react";
import { Select } from "./Select";
import { getPlayersList } from "@/utils/utils";

export function SelectPlayers({ defaultOption, setPlayers }: { defaultOption: string, setPlayers: (players: string) => void }): ReactElement {
    return (
        <Select 
            title="Players"
            list={getPlayersList()} 
            defaultOption={defaultOption} 
            getOption={setPlayers} 
        />
    );
}