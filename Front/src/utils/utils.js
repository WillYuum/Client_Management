export const CreateTime = () => {
  const CurrntDate = new Date(); //cTime = CurrentTime
  const date =
    " " + CurrntDate.getDate() +
    "-" +
    (CurrntDate.getMonth() + 1) +
    "-" +
    CurrntDate.getFullYear();
  return date;
};

export default CreateTime
