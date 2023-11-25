import { Heading } from "../Heading";
import styles from './styles.module.scss';
import classNames from "classnames";
import { HamburgerButton } from "../HamburgerButton";
import { Theme } from "../../constants/theme";
import { Link, LinkProps } from "../Link";
import { Line } from "../Line";

export interface MenuProps {
  title: string;
  theme: Theme;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  linkSections: {
    sectionName?: string;
    links: LinkProps[];
  }[]
}

export const Menu = ({ theme, title, isOpen, setIsOpen, linkSections } : MenuProps) => {

  return (
    <>
      <HamburgerButton toggle={isOpen} onClick={() => setIsOpen(!isOpen)} theme={theme} />
      <div className={classNames(styles.menu, styles[theme], { [styles.open]: isOpen })}>
        <Heading className={styles.title} headingType="h3" theme={theme}>{title}</Heading>
        {linkSections.map((section, index) => {
          const { sectionName, links } = section;
          const sectionKey = `${section}-${index}`;
          const isLastSection = index === linkSections.length - 1;

          return (
            <div key={sectionKey} className={styles.section}>
              {sectionName && <Heading headingType='h5' className={styles.sectionHeading}>{sectionName}</Heading>}
              {links.map((linkProps, linkIndex) => {
                const linkKey = sectionKey + linkIndex;

                return (
                  <div className={styles.linkWrapper}>
                    <Link
                      {...linkProps}
                      key={linkKey}
                      className={styles.link}
                      onClick={() => { setIsOpen(false); }} />
                  </div>
                )
              })}
              {!isLastSection && <Line theme={theme}/>}
            </div>
          )
        })}
      </div>
      {isOpen && <div className={styles.openLayout} onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
