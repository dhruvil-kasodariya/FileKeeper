import { createAction } from "../../utils/reducer/reducer.utils";
import { FILE_ACTION_TYPE } from "./file.type";

export const getFilesByUserStart = () =>
  createAction(FILE_ACTION_TYPE.GET_FILES_BY_USER_START);

export const getFilesByUserSuccess = (files) =>
  createAction(FILE_ACTION_TYPE.GET_FILES_BY_USER_SUCCESS, files);

export const getFilesByUserFailed = (error) =>
  createAction(FILE_ACTION_TYPE.GET_FILES_BY_USER_FAILED, error);

export const deleteFileStart = () =>
  createAction(FILE_ACTION_TYPE.DELETE_FILE_BY_USER_START);

export const deleteFileSuccess = (_id) =>
  createAction(FILE_ACTION_TYPE.DELETE_FILE_BY_USER_SUCCESS, _id);

export const deleteFileFailed = (error) =>
  createAction(FILE_ACTION_TYPE.DELETE_FILE_BY_USER_FAILED, error);

export const addFileStart = () =>
  createAction(FILE_ACTION_TYPE.ADD_FILE_BY_USER_START);

export const addFileSuccess = (file) =>
  createAction(FILE_ACTION_TYPE.ADD_FILE_BY_USER_SUCCESS, file);

export const addFileFailed = (error) =>
  createAction(FILE_ACTION_TYPE.ADD_FILE_BY_USER_FAILED, error);
