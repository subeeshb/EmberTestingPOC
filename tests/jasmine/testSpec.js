describe("method1", function() {
    it("should call method2", function() {
        spyOn(App.TestObject, 'method2');
        App.TestObject.method1();
        expect(App.TestObject.method2).toHaveBeenCalled();
    });
});