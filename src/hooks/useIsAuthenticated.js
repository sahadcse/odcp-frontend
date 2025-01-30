const { useSelector } = require("react-redux")

const useisAuthenticated = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    return isAuthenticated;
}

export default useisAuthenticated;