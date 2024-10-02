import { Variants } from 'framer-motion'

export const cardVariants: Variants = {
	offscreen: {
	  y: 100  ,
	  opacity: 0
	},
	onscreen: {
	  y: 10,
	  opacity: 1,
	  transition: {
		type: "spring",
		bounce: 0.4,
		duration: 0.8
	  }
	}
};

export const cardVariants2: Variants = {
	offscreen: {
	  x: 100  ,
	  opacity: 0
	},
	onscreen: {
	  x: 0,
	  opacity: 1,
	  transition: {
		type: "spring",
		bounce: 0.4,
		duration: 0.8
	  }
	}
};

export const cardVariants3: Variants = {
	offscreen: {
	  x: 250,
	  opacity: 0,
	  scale: 0.5
	},
	onscreen: {
	  x: 0,
	  scale: 1,
	  opacity: 1,
	  transition: {
		type: "spring",
		bounce: 0.4,
		duration: 1
	  }
	}
};


export const variantDuration: Variants = {
	offscreen: {
	  y: 50  ,
	  opacity: 0,
	  rotate: 10
	},
	onscreen: {
	  y: 10,
	  opacity: 1,
	  rotate: 0,
	  transition: {
		type: "spring",
		bounce: 0.4,
		duration: 1.5
	  }
	}
};

export const scale: Variants = {
	offscreen: {
	  scale: 0
	},
	onscreen: {
	  scale: 1,
	  transition: {
		type: "spring",
		bounce: 0.4,
		duration: 0.8
	  }
	}
};

export const opacity: Variants = {
	offscreen: {
		opacity: 0.3
	},
	onscreen: {
		opacity: 1,
	  transition: {
		type: "spring",
		bounce: 0.4,
		duration: 0.8
	  }
	}
};

