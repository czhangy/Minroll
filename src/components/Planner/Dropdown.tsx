// Stylesheet
import styles from "@/styles/Planner/Dropdown.module.scss";
// Next
import Image from "next/image";
// TS
import { SyntheticEvent } from "react";

type Props = {
    children: JSX.Element;
    open: boolean;
    value: string | null;
    src: string | null;
    onOpen: (e: SyntheticEvent) => void;
    onClose: () => void;
};

const Dropdown: React.FC<Props> = ({
    children,
    open,
    value,
    src,
    onOpen,
    onClose,
}: Props) => {
    return (
        <button className={styles.dropdown} onClick={onOpen} onBlur={onClose}>
            {value && src ? (
                <div className={styles["dropdown-selection"]}>
                    <Image src={src} alt="" height={25} width={30} />
                    <p className={styles["dropdown-text"]}>{value}</p>
                </div>
            ) : (
                <p className={styles["dropdown-text"]}>Select a class...</p>
            )}
            <div
                className={`${styles["dropdown-icon"]} ${
                    open ? styles.rotated : ""
                }`}
            >
                <Image
                    src="/icons/chevron-down.svg"
                    alt=""
                    height={20}
                    width={20}
                />
            </div>
            {children}
        </button>
    );
};

export default Dropdown;
