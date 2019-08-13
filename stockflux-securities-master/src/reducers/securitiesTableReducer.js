import { TableState } from "../enums";

export const initialTableState = {
  fetchStatus: TableState.LOADING,
  hasErrors: false,
  messages: []
};

export function securitiesTableReducer(state, action) {
  switch (action.type) {
    case TableState.LOADING:
      return {
        ...state,
        fetchStatus: TableState.LOADING,
        hasErrors: false,
        messages: []
      };
    case TableState.DELETING:
      return {
        ...state,
        fetchStatus: TableState.DELETING,
        hasErrors: false,
        messages: []
      };
    case TableState.UPDATING:
      return {
        ...state,
        fetchStatus: TableState.UPDATING,
        hasErrors: false,
        messages: []
      };
    case TableState.ERROR:
      return {
        ...state,
        fetchStatus: null,
        hasErrors: true,
        messages: action.messages
      };
    case TableState.SUCCESS:
      return {
        ...state,
        fetchStatus: null,
        hasErrors: false,
        messages: action.messages
      };
    default:
      throw new Error("Action Not Defined");
  }
}
