export default function css(...classNames: string[]) {
  let result = '';
  for (let i = 0 ; i < classNames.length; i++) {
    const className = classNames[i];
    result += ` ${className} `;
  }
  return result;
}