def checkio(data):

    #replace this for solution
    return ""

#These "asserts" using only for self-checking and not necessary for auto-testing
if __name__ == '__main__':    
    assert checkio( "10:37:49" ) == ".- .... : .-- .--- : -.. -..-", "First Test"
    assert checkio( "21:34:56" ) == "-. ...- : .-- .-.. : -.- .--.", "Second Test"
    assert checkio( "11:10:12" ) == ".- ...- : ..- .... : ..- ..-.", "Third Test"
    assert checkio( "23:59:59" ) == "-. ..-- : -.- -..- : -.- -..-", "Fourth Test"
    
