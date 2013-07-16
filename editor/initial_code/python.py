def checkio(data):

    #replace this for solution
    return ""

#These "asserts" using only for self-checking and not necessary for auto-testing
if __name__ == '__main__':    
    assert checkio( "10:37:49" ) == "._ .... : .__ .___ : _.. _.._", "First Test"
    assert checkio( "21:34:56" ) == "_. ..._ : .__ ._.. : _._ .__.", "Second Test"
    assert checkio( "11:10:12" ) == "._ ..._ : .._ .... : .._ .._.", "Third Test"
    assert checkio( "23:59:59" ) == "_. ..__ : _._ _.._ : _._ _.._", "Fourth Test"
    
