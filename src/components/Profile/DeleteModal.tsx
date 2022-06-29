// Stylesheet
import styles from "@/styles/Profile/DeleteModal.module.scss";
// TS
import { SyntheticEvent } from "react";

type Props = {
    open: boolean;
    buildName?: string;
    onConfirm: () => void;
    onClose: () => void;
};

const DeleteModal: React.FC<Props> = (props: Props) => {
    // Stops click on content from closing modal
    const contentClick = (e: SyntheticEvent) => e.stopPropagation();

    return (
        <div
            id={styles["delete-modal"]}
            className={props.open ? styles["show-overlay"] : ""}
            onClick={props.onClose}
        >
            <div id={styles["delete-modal-content"]} onClick={contentClick}>
                <h2 id={styles["delete-header"]}>
                    Are you sure you want to delete
                    <br />
                    {props.buildName ? props.buildName : "this build"}?
                </h2>
                <div id={styles["delete-buttons"]}>
                    <button
                        className={styles["delete-button"]}
                        onClick={props.onClose}
                    >
                        No
                    </button>
                    <button
                        className={styles["delete-button"]}
                        onClick={props.onConfirm}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
