function detectPageCategory() {
    if (find('div', 'Message')) {
        return 'user';
    }
    return 'home';
}


