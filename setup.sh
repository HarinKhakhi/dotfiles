# Update and upgrade packages
sudo apt update && sudo apt upgrade -y

# Install zsh
sudo apt install -y zsh

# install nerd fonts
curl -OL https://github.com/ryanoasis/nerd-fonts/releases/latest/download/Meslo.tar.xz
tar -xvf Meslo.tar.xz
mv Meslo ~/.local/share/fonts/

# Install oh-my-zsh
echo "downloading oh-my-zsh..."
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

echo "downloading powerlevel10k..."
# Install powerlevel10k
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

echo "downloading zsh-autosuggestions..."
# Install zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

echo "downloading zsh-syntax-highlighting..."
# Install zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

echo "downloading fzf..."
# Install fzf
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install

echo "downloading zoxide..."
# Install zoxide
curl -sS https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | bash

echo "downloading batcat..."
# Install batcat
wget -c https://github.com/sharkdp/bat/releases/download/v0.25.0/bat-v0.25.0-x86_64-unknown-linux-gnu.tar.gz -O - | tar xz
chmod +x bat-v0.25.0-x86_64-unknown-linux-gnu/bat
mv bat-v0.25.0-x86_64-unknown-linux-gnu/bat ~/.local/bin/
    
echo "downloading fd..."
# Install fd
wget -c https://github.com/sharkdp/fd/releases/download/v10.2.0/fd-v10.2.0-arm-unknown-linux-gnueabihf.tar.gz -O - | tar xz
chmod +x fd-v10.2.0-arm-unknown-linux-gnueabihf/fd
mv fd-v10.2.0-arm-unknown-linux-gnueabihf/fd ~/.local/bin/

echo "downloading eza..."
# Install eza
wget -c https://github.com/eza-community/eza/releases/latest/download/eza_x86_64-unknown-linux-gnu.tar.gz -O - | tar xz
chmod +x eza
mv eza ~/.local/bin/

echo "downloading delta..."
# Install delta
wget -c https://github.com/dandavison/delta/releases/download/0.18.2/delta-0.18.2-x86_64-unknown-linux-gnu.tar.gz -O - | tar xz
chmod +x delta-0.18.2-x86_64-unknown-linux-gnu/delta
mv delta-0.18.2-x86_64-unknown-linux-gnu/delta ~/.local/bin/

export PATH=$HOME/.local/bin:$PATH