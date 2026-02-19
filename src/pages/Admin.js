import { useState } from "react";
import { motion } from "framer-motion";
import cx from "classnames";
import styles from "../styles/Admin.module.scss";
import "../styles/admin.scss";

const Admin = () => {
  return (
    <motion.div
      className={cx(styles["admin-page"], "page-transition")}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <div className="container">
        <header className={cx("page-header form-header")}>
          <h2 className="heading">Admin</h2>
        </header>
        <main className={styles.main}>
          <p style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>
            Admin panel is currently disabled. Firebase hooks have been removed.
          </p>
        </main>
      </div>
    </motion.div>
  );
};

export default Admin;