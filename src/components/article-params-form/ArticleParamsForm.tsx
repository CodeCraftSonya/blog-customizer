import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	setFormState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	setAppliedState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	formState,
	setFormState,
	setAppliedState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);
	const arrowButtonRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (!isOpen) return;

			const target = e.target as HTMLElement;
			if (
				ref.current?.contains(target) ||
				arrowButtonRef.current?.contains(target)
			) {
				return;
			}

			if (target.closest('[data-testid="selectDropdown"]')) {
				return;
			}
			setIsOpen(false);
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
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setAppliedState(formState);
						setIsOpen(false);
					}}
					onReset={() => {
						setFormState(defaultArticleState);
						setAppliedState(defaultArticleState);
					}}>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
						}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontSizeOption: option }))
						}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontColor: option }))
						}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, backgroundColor: option }))
						}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, contentWidth: option }))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
