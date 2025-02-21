type InputLabelType = {
  labelName: string;
  value: string;
  type: string;
  placeholder: string;
  changeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputLabel({ placeholder, labelName, value, changeFunction, type }: InputLabelType) {
  return (
    <label htmlFor={ labelName }>
        {labelName}: 
        <input placeholder={ placeholder } id={ labelName } type={ type } value={ value } onChange={ changeFunction } />
    </label>
  )
}

export default InputLabel;