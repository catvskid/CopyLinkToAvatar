/**
 * @name BiggerStreamPreview
 * @authorId 289112759948410881
 * @invite z6Yx9A8VDR
 * @website https://github.com/jaimeadf/BetterDiscordPlugins/tree/main/BiggerStreamPreview
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/blob/main/BiggerStreamPreview/BiggerStreamPreview.plugin.js
 * @updateUrl https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/BiggerStreamPreview/BiggerStreamPreview.plugin.js
 */

} : (([Plugin, Library]) => {
    const { DiscordModules, WebpackModules, Patcher, DiscordContextMenu } = Library;
    const { React, ModalStack } = DiscordModules;

    class CopyLinkToAvatar extends Plugin {
        constructor() {
            super();
        }

        onStart() {
            this.patchUserContextMenus();
        }

        onStop() {
            Patcher.unpatchAll();
        }

        patchUserContextMenus() {
            const UserContextMenus = WebpackModules.findAll(
                m => m.default && m.default.displayName.includes("UserContextMenu"));

            const patch = (thisObject, [props], returnValue) => {
                const { user } = propss

                returnValue.props.children.props.children.push(
                    DiscordContextMenu.buildMenuItem({
                        type: "separator"
                    }),
                    DiscordContextMenu.buildMenuItem({
                        label: "Copy Avatar Link",
                        action: async () => {
                            await this.showImageModal(previewURL)
                        },
                        disabled: previewURL === null
                    })
                );
            };

            for (const UserContextMenu of UserContextMenus) {
                Patcher.after(UserContextMenu, "default", patch);
            }
        }
