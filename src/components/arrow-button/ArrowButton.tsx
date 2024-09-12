import React, { useState } from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	onClick: OnClick;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick }) => {
	const [isActive, setIsActive] = useState(false);

	const handleClick = () => {
		setIsActive(!isActive);
		onClick();
	};

	const buttonClass = clsx(styles.container, {
		[styles.container_open]: isActive,
		[styles.container_closed]: !isActive,
	});

	const arrowClass = clsx(styles.arrow, {
		[styles.arrow_open]: isActive,
	});

	return (
		<div
			onClick={handleClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={buttonClass}>
			<img src={arrow} alt='иконка стрелочки' className={arrowClass} />
		</div>
	);
};
