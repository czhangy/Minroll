// Stylesheet
import styles from "@/styles/Planner/ResetModal.module.scss";
// TS
import { SyntheticEvent } from "react";

type Props = {
    open: boolean;
    onConfirm: () => void;
    onClose: () => void;
};

const ResetModal: React.FC<Props> = ({ open, onConfirm, onClose }: Props) => {
    // Stops click on content from closing modal
    const contentClick = (e: SyntheticEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            id={styles["reset-modal"]}
            className={open ? styles["show-overlay"] : ""}
            onClick={onClose}
        >
            <div id={styles["reset-modal-content"]} onClick={contentClick}>
                <h2 id={styles["reset-header"]}>
                    Resets cannot be undone.
                    <br />
                    Are you sure?
                </h2>
                <div id={styles["reset-buttons"]}>
                    <button
                        className={styles["reset-button"]}
                        onClick={onClose}
                    >
                        No
                    </button>
                    <button
                        className={styles["reset-button"]}
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetModal;
