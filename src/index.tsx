import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [sideBarState, setSideBarState] =
		useState<ArticleStateType>(defaultArticleState);
	const [articleState, setArticleState] = useState(defaultArticleState);

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

	const applySideBarState = (event: FormEvent) => {
		event.preventDefault();
		setArticleState({ ...sideBarState });
	};

	const resetSideBarState = () => {
		setArticleState(defaultArticleState);
		setSideBarState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={sideBarState}
				handleFontFamilyChange={handleFontFamilyChange}
				handleFontSizeChange={handleFontSizeChange}
				handleFontColorChange={handleFontColorChange}
				handleBackgroundColorChange={handleBackgroundColorChange}
				handleContentWidthChange={handleContentWidthChange}
				applySideBarState={applySideBarState}
				resetSideBarState={resetSideBarState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
