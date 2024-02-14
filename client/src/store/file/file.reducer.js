import { FILE_ACTION_TYPE } from "./file.type";

const INITIAL_STATE = {
  fileList: null,
  isLoading: false,
  error: null,
};

export const fileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FILE_ACTION_TYPE.GET_FILES_BY_USER_START:
    case FILE_ACTION_TYPE.DELETE_FILE_BY_USER_START:
    case FILE_ACTION_TYPE.ADD_FILE_BY_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case FILE_ACTION_TYPE.GET_FILES_BY_USER_SUCCESS:
      return {
        ...state,
        fileList: payload,
        isLoading: false,
      };

    case FILE_ACTION_TYPE.ADD_FILE_BY_USER_SUCCESS:
      return {
        ...state,
        fileList: [...state.fileList, payload],
        isLoading: false,
      };

    case FILE_ACTION_TYPE.DELETE_FILE_BY_USER_SUCCESS:
      const newFileList =state.fileList.filter((file) => file._id !== payload)
    
      return {
        ...state,
        fileList: newFileList,
        isLoading: false,
      };
    case FILE_ACTION_TYPE.GET_FILES_BY_USER_FAILED:
    case FILE_ACTION_TYPE.DELETE_FILE_BY_USER_FAILED:
    case FILE_ACTION_TYPE.ADD_FILE_BY_USER_FAILED:
      return {
        ...state,
        error: payload.response.data,
        isLoading: false,
      };

    default:
      return state;
  }
};
