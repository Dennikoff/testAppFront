import React from 'react';
import styles from './Administration.module.scss';
import SidebarMenu from '@/shared/SidebarMenu/SidebarMenu';
import Control from './components/Control/Control';

export default function Administration() {
	return (
		<div className={`page-wrapper ` + styles.administrationPage}>
			<SidebarMenu/>
			<Control/>
		</div>
	)
}
