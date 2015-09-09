var ts = require("typescript");
var Converter_1 = require("../../Converter");
var type_1 = require("../type");
var node_1 = require("../node");
var TupleType_1 = require("../../../models/types/TupleType");
var Reflection_1 = require("../../../models/Reflection");
var DeclarationReflection_1 = require("../../../models/reflections/DeclarationReflection");
var ReflectionType_1 = require("../../../models/types/ReflectionType");
var DestructuringConverter = (function () {
    function DestructuringConverter() {
    }
    DestructuringConverter.prototype.supportsNode = function (context, node) {
        return node.kind === 160;
    };
    DestructuringConverter.prototype.convertNode = function (context, node) {
        if (node.kind == 160) {
            var types = [];
            node.elements.forEach(function (element) {
                types.push(type_1.convertType(context, element));
            });
            return new TupleType_1.TupleType(types);
        }
        else {
            var declaration = new DeclarationReflection_1.DeclarationReflection();
            declaration.kind = Reflection_1.ReflectionKind.TypeLiteral;
            declaration.name = '__type';
            declaration.parent = context.scope;
            context.registerReflection(declaration, null);
            context.trigger(Converter_1.Converter.EVENT_CREATE_DECLARATION, declaration, node);
            context.withScope(declaration, function () {
                node.elements.forEach(function (element) {
                    node_1.convertNode(context, element);
                });
            });
            return new ReflectionType_1.ReflectionType(declaration);
        }
    };
    return DestructuringConverter;
})();
exports.DestructuringConverter = DestructuringConverter;