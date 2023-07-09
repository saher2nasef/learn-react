const SaveData = ({ Data, SaveAs }) => {
  localStorage.setItem(SaveAs, JSON.stringify(Data));
  return true;
};
const GetData = (KeyName) => {
  if (localStorage.getItem(KeyName) !== null) {
    return JSON.parse(localStorage.getItem(KeyName));
  } else {
    return [];
  }
};
export { SaveData, GetData };
