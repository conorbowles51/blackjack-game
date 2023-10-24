import React, { useContext, useState } from 'react'

const PlayerOverrideContext = React.createContext();
const PlayerOverrideToggleContext = React.createContext();

export const usePlayerOverride = () => {
    return useContext(PlayerOverrideContext);
}

export const usePlayerOverrideToggle = () => {
    return useContext(PlayerOverrideToggleContext);
}

const PlayerOverrideProvider = ({children}) => {
    const [disabled, setDisabled] = useState(false);

    return (
        <PlayerOverrideContext.Provider value={disabled}>
            <PlayerOverrideToggleContext.Provider value={(val) => {setDisabled(val)}}>
                {children}
            </PlayerOverrideToggleContext.Provider>
        </PlayerOverrideContext.Provider>
    );
}

export default PlayerOverrideProvider