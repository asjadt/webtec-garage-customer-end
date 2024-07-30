import { useContext } from 'react'
import { ViewProfileContext } from '../ViewProfile'

export default function useViewProfileContext() {
    const context = useContext(ViewProfileContext);

    if (!context) {
        throw new Error(
            "useViewProfileContext must be used within a ViewProfileContext.Provider"
        );
    }
    return context;
}
