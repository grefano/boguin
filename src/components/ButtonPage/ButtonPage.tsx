

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    link: string;
}

const ButtonPage: React.FC<Props> = ({ children, link, ...props }) => {
    return (
        <button className="btn btnpage" {...props} onClick={() => {location.href=link}}>{children}</button>
    )
}


export default ButtonPage