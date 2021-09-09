import React from 'react'
import PilotosContext from './index'

export default function PilotosProvider({ children }) {
    return (
        <PilotosContext.Provider value={ {showAlert : () => alert("Provider")}}>
            {children}
        </PilotosContext.Provider>
    )
}
