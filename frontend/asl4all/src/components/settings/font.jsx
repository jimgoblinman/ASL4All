import styles from "./font.module.css";

export default function Font() {
    const handleChange = (e) => {
        document.body.style.fontFamily = e.target.value;
    };

    return (
        <form className={styles.select}>
            <select name="fonts" id="fonts" className="text-white bg-[#] rounded-[0.7rem]" onChange={handleChange}>
                <option value="Arial" className={styles.fontArial}>Arial</option>
                <option value="Calibri" className={styles.fontCalibri}>Calibri</option>
                <option value="Gill Sans MT" className={styles.fontGillSansMt}>Gill Sans MT</option>
                <option value="Consolas" className={styles.fontConsolas}>Consolas</option>
                <option value="Inter" className={styles.fontInter}>Inter</option>
            </select>
        </form>
    );
}