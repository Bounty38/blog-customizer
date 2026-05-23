import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onApply: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(articleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleOutsideClick = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!rootRef.current?.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const handleToggleOpen = () => {
		setIsOpen((currentIsOpen) => !currentIsOpen);
	};

	const handleChange = <Key extends keyof ArticleStateType>(
		fieldName: Key,
		value: ArticleStateType[Key]
	) => {
		setFormState((currentFormState) => ({
			...currentFormState,
			[fieldName]: value,
		}));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={handleToggleOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<div className={styles.controls}>
						<Select
							title='Шрифт'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(value) => handleChange('fontFamilyOption', value)}
						/>
						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							onChange={(value) => handleChange('fontSizeOption', value)}
						/>
						<Select
							title='Цвет шрифта'
							selected={formState.fontColor}
							options={fontColors}
							onChange={(value) => handleChange('fontColor', value)}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={(value) => handleChange('backgroundColor', value)}
						/>
						<Select
							title='Ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={(value) => handleChange('contentWidth', value)}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
