import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);
	const arrowButtonRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (
				isOpen &&
				ref.current &&
				!ref.current.contains(e.target as Node) &&
				arrowButtonRef.current &&
				!arrowButtonRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [isOpen]);
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
				ref={arrowButtonRef}
			/>
			<aside
				className={`${isOpen ? styles.container_open : ''} ${styles.container}`}
				ref={ref}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
