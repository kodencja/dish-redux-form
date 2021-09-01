import { output_Style, final_response, typeSet, typeChange, reset, imgName, any_change_made, welcome_txt } from "./dishTypes"


export const setOutputStyle = (value) =>{
    return {
        type: output_Style,
        payload: value
    }
};

export const setFinalResponse = (words) => {
    return {
        type: final_response,
        payload: words
    }
}

export const setTypeSet = (value) => {
    return {
        type: typeSet,
        payload: value
    }
}

export const setTypeChange = (value) => {
    return {
        type: typeChange,
        payload: value
    }
}

export const setWelcomeTxt = (value) => {
    return {
        type: welcome_txt,
        payload: value
    }
}

export const resetAll = () => {
    return {
        type: reset
    }
}

export const setImgSrc = (name) => {
    return {
        type: imgName,
        payload: name
    }
}

export const checkIfAnyChangeMade = (val) => {
    return {
        type: any_change_made,
        payload: val
    }
}