const { useSelector } = require("react-redux")

const useUserData = () => {
    const data = useSelector((state) => state.user.userInfo);
    if (data) {
        return data;
    } else {
        return [];
    }
}

export default useUserData;