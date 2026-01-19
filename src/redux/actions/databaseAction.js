import { SET_DATA_FROM_DATABASE } from "../constants";

export function setDataFromDatabase (item){
  return{
    type:SET_DATA_FROM_DATABASE,
    data:item
  }
}