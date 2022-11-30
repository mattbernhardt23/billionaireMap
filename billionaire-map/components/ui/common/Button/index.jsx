
const SIZE = {
  sm: "p-1 text-base xs:px-4",
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
    white: `rounded-md text-black bg-white`,
    green: `rounded-md text-white bg-green-600 ${hoverable && "hover:bg-green-700"}`,
    purple: `rounded-md text-white bg-indigo-600 ${hoverable && "hover:bg-indigo-700"}`,
    red: `rounded-md text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
    gray: `rounded-md text-white bg-gray-500 ${hoverable && "hover:bg-red-700"}`,
    lightGray: `rounded-md text-red-700 bg-gray-100 border-gray-500 border-2 ${hoverable && "hover:bg-gray-500"}`,
    searchLightGray: `rounded-r-md text-red-700 bg-gray-100 border-gray-500 border-2 hadow-inner shadow-gray-500 ${hoverable && "hover:bg-gray-500"}`,
  }

  return (
    <button
      {...rest}
      className={`${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed borderfont-medium ${className} ${variants[variant]}`}>
      {children}
    </button>
  )
}