import { CartProvider } from "./CartContext"
import { UserProvider } from "./UseContext"

const AppProvider = ({ children }) => {

    return (
        <UserProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </UserProvider>
    )

}

export default AppProvider