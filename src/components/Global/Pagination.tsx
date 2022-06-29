// Stylesheet
import styles from "@/styles/Global/Pagination.module.scss";
// Next
import Image from "next/image";

type Props = {
    page: number;
    maxPage: number;
    onPrev: () => void;
    onNext: () => void;
};

const Pagination: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles.pagination}>
            {props.page > 1 ? (
                <button
                    className={`${styles["arrow"]} ${styles["left"]}`}
                    onClick={props.onPrev}
                >
                    <Image
                        src="/icons/chevron.svg"
                        alt="Previous page"
                        layout="fill"
                        objectFit="contain"
                    />
                </button>
            ) : (
                ""
            )}
            <p className={styles["page-num"]}>{props.page}</p>
            <p className={styles.slash}>/</p>
            <p className={styles["page-num"]}>{props.maxPage}</p>
            {props.page !== props.maxPage ? (
                <button
                    className={`${styles["arrow"]} ${styles["right"]}`}
                    onClick={props.onNext}
                >
                    <Image
                        src="/icons/chevron.svg"
                        alt="Next page"
                        layout="fill"
                        objectFit="contain"
                    />
                </button>
            ) : (
                ""
            )}
        </div>
    );
};

export default Pagination;
