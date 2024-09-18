import React, { useState, useRef, useCallback } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
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
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	setDataPage: (data: ArticleStateType) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	setDataPage,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
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
	const rootRef = useRef<HTMLDivElement | null>(null);

	const handleFontFamilyChange = useCallback(
		(fontFamily: OptionType) => setFontFamily(fontFamily),
		[]
	);
	const handleFontSizeChange = useCallback(
		(fontSize: OptionType) => setFontSize(fontSize),
		[]
	);
	const handleFontColorChange = useCallback(
		(fontColor: OptionType) => setFontColor(fontColor),
		[]
	);
	const handleBackgroundColorChange = useCallback(
		(backgroundColor: OptionType) => setBackgroundColor(backgroundColor),
		[]
	);
	const handleContentWidthChange = useCallback(
		(contentWidth: OptionType) => setContentWidth(contentWidth),
		[]
	);

	const handleReset = useCallback(() => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setDataPage(defaultArticleState);
	}, [setDataPage]);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setDataPage({
				fontFamilyOption: fontFamily,
				fontSizeOption: fontSize,
				fontColor: fontColor,
				backgroundColor: backgroundColor,
				contentWidth: contentWidth,
			});
		},
		[
			setDataPage,
			fontFamily,
			fontSize,
			fontColor,
			backgroundColor,
			contentWidth,
		]
	);
	const handleOpenForm = useCallback(() => {
		setIsMenuOpen((prev) => !prev);
	}, []);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	const modalStyle = clsx(styles.container, {
		[styles.container_open]: isMenuOpen,
	});
	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleOpenForm} />
			<aside className={modalStyle} ref={rootRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
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
					<div className={styles.bottomContainer}>
						<Button type='submit' title='Применить' />
						<Button type='button' title='Сбросить' onClick={handleReset} />
					</div>
				</form>
			</aside>
		</>
	);
};
