import {ThreeDots  as Loader} from 'react-loader-spinner';
function LoadingIndicator({isLoading}){
    return (
        isLoading &&
        <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Loader type="ThreeDots" color="#F4C026" height="100" width="100" />
        </div>
    )
};

export default LoadingIndicator;