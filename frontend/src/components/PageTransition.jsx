import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { varPageTransition } from '../utils/animations';

export default function PageTransition({ children, ...props }) {
  return (
    <motion.div
      variants={varPageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  );
}

PageTransition.propTypes = {
  children: PropTypes.node,
};
