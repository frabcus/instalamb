function detectPageCategory() {
    if (findElement('div', 'Message')) {
        return 'user';
    }
    return 'home';
}


