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
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
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
	setArticleState,
}: ArticleParamsFormProps) => {
	const [sideBarState, setSideBarState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setOpen] = useState(false);
	const ref = useRef<HTMLFormElement | null>(null);

	const applySideBarState = (event: FormEvent) => {
		event.preventDefault();
		setArticleState({ ...sideBarState });
	};

	const handleFontFamilyChange = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontFamilyOption: select });
	};

	const handleFontSizeChange = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontSizeOption: select });
	};

	const handleFontColorChange = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontColor: select });
	};

	const handleBackgroundColorChange = (select: OptionType) => {
		setSideBarState({ ...sideBarState, backgroundColor: select });
	};

	const handleContentWidthChange = (select: OptionType) => {
		setSideBarState({ ...sideBarState, contentWidth: select });
	};

	const resetSideBarState = () => {
		setArticleState(defaultArticleState);
		setSideBarState(defaultArticleState);
	};

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
						selected={sideBarState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={sideBarState.fontSizeOption}
						title='размер шрифта'
						onChange={handleFontSizeChange}
					/>
					<Select
						selected={sideBarState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						selected={sideBarState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={handleBackgroundColorChange}
					/>
					<Select
						selected={sideBarState.contentWidth}
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
