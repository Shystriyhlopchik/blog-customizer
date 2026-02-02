import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	handleFontFamilyChange: (select: OptionType) => void;
	handleFontSizeChange: (select: OptionType) => void;
	handleFontColorChange: (select: OptionType) => void;
	handleBackgroundColorChange: (select: OptionType) => void;
	handleContentWidthChange: (select: OptionType) => void;
	applySideBarState: (event: FormEvent) => void;
	resetSideBarState: () => void;
};

type TUseHandleClickOutsideOptions = {
	isOpen: boolean;
	asideRef: React.RefObject<HTMLElement>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function shouldCloseAside(
	e: MouseEvent,
	asideRef: React.RefObject<HTMLElement>,
	isOpen: boolean
): boolean {
	return (
		isOpen && !!asideRef.current && !asideRef.current.contains(e.target as Node)
	);
}

const useHandleClickOutside = (prop: TUseHandleClickOutsideOptions) => {
	const { isOpen, asideRef, setOpen } = prop;

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (shouldCloseAside(e, asideRef, isOpen)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);
};

export const ArticleParamsForm = ({
	articleState,
	handleFontFamilyChange,
	handleFontSizeChange,
	handleFontColorChange,
	handleBackgroundColorChange,
	handleContentWidthChange,
	applySideBarState,
	resetSideBarState,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const ref = useRef<HTMLFormElement | null>(null);

	useHandleClickOutside({ isOpen, asideRef: ref, setOpen });

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setOpen(!isOpen);
				}}
			/>
			<aside
				ref={ref}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={applySideBarState}>
					<Text as={'h1'} size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						title='размер шрифта'
						onChange={handleFontSizeChange}
					/>
					<Select
						selected={articleState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						selected={articleState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={handleBackgroundColorChange}
					/>
					<Select
						selected={articleState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetSideBarState}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
