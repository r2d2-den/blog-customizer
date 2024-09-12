import React, { useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setDataPage: (data: ArticleStateType) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	setDataPage,
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const handleOpenForm = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleFontFamilyChange = (fontFamily: OptionType) => {
		setFontFamily(fontFamily);
	};

	const handleFontSizeChange = (fontSize: OptionType) => {
		setFontSize(fontSize);
	};

	const handleFontColorChange = (fontColor: OptionType) => {
		setFontColor(fontColor);
	};

	const handleBackgroundColorChange = (backgroundColor: OptionType) => {
		setBackgroundColor(backgroundColor);
	};

	const handleContentWidthChange = (contentWidth: OptionType) => {
		setContentWidth(contentWidth);
	};

	const handleReset = () => {
		const initialState: ArticleStateType = defaultArticleState;
		setFontFamily(initialState.fontFamilyOption);
		setFontSize(initialState.fontSizeOption);
		setFontColor(initialState.fontColor);
		setBackgroundColor(initialState.backgroundColor);
		setContentWidth(initialState.contentWidth);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDataPage({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	const modalStyle = clsx(styles.container, {
		[styles.container_open]: open,
	});

	return (
		<>
			<ArrowButton onClick={handleOpenForm} />
			<aside className={modalStyle}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						title='Шрифт'
						selected={fontFamily}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						options={fontSizeOptions}
						title='Размер шрифта'
						name='Размер шрифта'
						selected={fontSize}
						onChange={handleFontSizeChange}
					/>
					<Select
						options={fontColors}
						title='Цвет шрифта'
						selected={fontColor}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						title='Цвет фона'
						selected={backgroundColor}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						options={contentWidthArr}
						title='Ширина контента'
						selected={contentWidth}
						onChange={handleContentWidthChange}
					/>
					<Separator />
					<div className={styles.bottomContainer}>
						<Button type='submit' title='Применить' />
						<Button type='button' title='Сбросить' onClick={handleReset} />
					</div>
				</form>
			</aside>
		</>
	);
};
