
const SIZE = {
  sm: "p-2 text-base xs:px-4",
  md: "p-2 text-base xs:px-8",
  lg: "p-3 text-lg xs:px-8"
}



export default function Button({
  children,
  className,
  size = "md",
  hoverable = true,
  variant = "purple",
  ...rest
}) {

  const sizeClass = SIZE[size]
  const variants = {
    white: `text-black bg-white`,
    green: `text-white bg-green-600 ${hoverable && "hover:bg-green-700"}`,
    purple: `text-white bg-indigo-600 ${hoverable && "hover:bg-indigo-700"}`,
    red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
    gray: `text-white bg-gray-500 ${hoverable && "hover:bg-red-700"}`,
    lightGray: `text-red-700 bg-gray-100 ${hoverable && "hover:bg-gray-500"}`,
  }

  return (
    <button
      {...rest}
      className={`${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed border rounded-md font-medium ${className} ${variants[variant]}`}>
      {children}
    </button>
  )
}