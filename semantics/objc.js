(function(){
  var utils = require('../lib/utils');
  
  Object.defineProperty(Array.prototype, "translationKeys", {
    "get": function() {
      var result = [];
      for (var i=0; i<this.length; i++) {
        var item = this[i];
        if (!item) {
          continue;
        }
        var translationKeys = item.translationKeys;
        if (translationKeys) {
          result.push(translationKeys);
        }
      }
      return result;
    }
  });
  Array.prototype.flatten = function() {
    var flat = [];
    for (var i=0; i<this.length; i++) {
      var item = this[i];
      if (item instanceof Array) {
        var flatItem = item.flatten();
        flat = flat.concat(flatItem);
      }
      else {
        flat.push(item);
      }
    }
    return flat;
  };
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        "ListOf_none": function() {
          return null;
        },
        "ListOf_some": function(first, separator, iter) {
          var all = [first].concat(iter.children);
          var result = all.translationKeys;
          if (!result || result.length === 0) {
            return null;
          }
          // debugger;
          return result;
        },
        "NonEmptyListOf": function(first, separator, iter) {
          var all = [first].concat(iter.children);
          var result = all.translationKeys;
          if (!result || result.length === 0) {
            return null;
          }
          // debugger;
          return result;
        },
        
        
        "Exp": function(_) {
          var result = _.translationKeys;
          debugger;
          return result;
        },
        
        
        "stringLiteral": function(_, str) {
          var result = str.translationKeys;
          if (result) {
            result.ctorName = this.ctorName;
          }
          debugger;
          return result;
        },
        "string": function(_, chars, _) {
          var result = utils.createResult(this, chars.interval.contents);
          debugger;
          return result;
        },
        "identifier": function(first, rests) {
          var result = utils.createResult("identifier", first.interval.contents + rests.interval.contents);
          debugger;
          return result;
        },
        
        
        "Import_hashed": function(keyword, path) {
          return null;
        },
        "Import_modern": function(keyword, name, _) {
          return null;
        },
        
        
        "ClassInterface": function(_, className, _, superClassName, protocol, instanceVariables, declarationList, _) {
          return declarationList.translationKeys;
        },
        "CategoryInterface": function(_, className, _, categoryName, _, protocol, instanceVariables, declarationList, _) {
          return declarationList.translationKeys;
        },
        "ClassImplementation": function(_, className, _, superClassName, instanceVariables, definitionList, _) {
          return definitionList.translationKeys;
        },
        "CategoryImplementation": function(_, className, _, categoryName, _, definitionList, _) {
          return definitionList.translationKeys;
        },
        "ProtocolDeclaration": function(_, protocolName, refList, _, requiredDeclarationList, _, optionalDeclarationList, _) {
          return [requiredDeclarationList, optionalDeclarationList].translationKeys;
        },
        "ProtocolDeclarationList": function(_, protocolList, _) {
          return null;
        },
        "ClassDeclarationList": function(_, classLIst, _) {
          return null;
        },
        
        
        "PropertyDeclaration": function(keyword, attributes, declaration) {
          return null;
        },
        "GetterPropertyAttribute": function (keyword, _, ident) {
          return null;
        },
        "SetterPropertyAttribute": function(keyword, _, ident, _) {
          return null;
        },
        
        
        "InstanceVariables_visibilityStructVars": function (_, visibilitySpec, structDecls, iVars, _) {
          return null;
        },
        "InstanceVariables_structVars": function (_, structDecls, iVars, _) {
          return null;
        },
        "InstanceVariables_visibilityStruct": function (_, visibilitySpec, structDecls, _) {
          return null;
        },
        "InstanceVariables_struct": function (_, structDecls, _) {
          return null;
        },
        
        
        "ClassMethodDeclaration": function (_, decl) {
          return null;
        },
        "InstanceMethodDeclaration": function (_, decl) {
          return null;
        },
        "ClassMethodDefinition": function (_, definition) {
          return definition.translationKeys;
        },
        "InstanceMethodDefinition": function(_, definition) {
          return definition.translationKeys;
        },
        "MethodDefinition": function(type, selector, declarationList, _, compoundStatement) {
          return compoundStatement.translationKeys;
        },
        "MethodSelector_withParams": function (keywords, params) {
          return null;
        },
        "KeywordDeclarator": function (selector, _, type, ident) {
          return null;
        },
        "MethodType": function (_, name, _) {
          return null;
        },
        
        "PropertyImplementation": function (_, synthesizeList, _) {
          return null;
        },
        "PropertySynthesizeItem_full": function (ident, _, ident) {
          return null;
        },
        
        
        "BlockType": function (typeSpec, _, _, typeSpec, _, params) {
          return null;
        },
        
        
        "GenericsSpecifier": function (_, typeSpec, _, additionalTypeSpecs, _) {
          return null;
        },
        "TypeSpecifier_generic": function (_, protocolList) {
          return null;
        },
        "TypeSpecifier_classed": function (className, specifier, pointer) {
          return null;
        },
        
        
        // "PrimaryExpression": function(exp) {
        //   var result = exp.translationKeys;
        //   debugger;
        //   return result;
        // },
        "PrimaryExpression_inParens": function (_, exp, _) {
          return exp.translationKeys;
        },
        
        "DictionaryPair": function (a, _, b) {
          var result = [a, b].translationKeys;
          debugger;
          return result;
        },
        "DictionaryExpression": function(_, _, pair, _, additional, _, _) {
          var result = [pair, additional].translationKeys;
          if (result) {
            var subKeys = utils.collectTranslationKeysFromObjects(result);
            if (subKeys && subKeys.length > 0) {
              result = utils.createResult("translationKeys", null, subKeys);
            }
          }
          debugger;
          return result;
        },
        
        "ArrayExpression": function (_, _, exp, _, additional, _, _) {
          var result = [exp, additional].translationKeys;
          return result;
        },
        
        "BoxExpression_conditional": function (_, _, exp, _) {
          var result = exp.translationKeys;
          return result;
        },
        "BoxExpression_constant": function (_, constantExp) {
          return null;
        },
        
        
        "BlockParameters": function (_, type, _, additional, _) {
          return null;
        },
        "BlockExpression": function (_, typeSpec, params, stmt) {
          return stmt.translationKeys;
        },
        
        
        "MessageExpression": function(_, receiver, selector, _) {
          var result = [receiver, selector].translationKeys;
          return result;
        },
        "KeywordArgument": function (selector, _, exp) {
          return exp.translationKeys;
        },
        
        
        "SelectorExpression": function (_, _, name, _) {
          return null;
        },
        "selectorName_withArg": function (_, _) {
          return null;
        },
        
        
        "ProtocolExpression": function (_, _, name, _) {
          return null;
        },
        "EncodeExpression": function (_, _, name, _) {
          return null;
        },
        
        
        "TryStatement": function (_, stmt) {
          return stmt.translationKeys;
        },
        "CatchStatement": function (_, _, typeDecl, _, stmt) {
          return stmt.translationKeys;
        },
        "FinallyStatement": function (_, stmt) {
          return stmt.translationKeys;
        },
        "ThrowStatement": function (_, _, ident, _) {
          return null;
        },
        "TryBlock": function (tryStmt, catchStmts, finallyStmt) {
          return [tryStmt, catchStmts, finallyStmt].translationKeys;
        },
        
        
        "SynchronizedStatement": function (_, _, primary, _, compound) {
          return [primary, compound].translationKeys;
        },
        "AutoreleaseStatement": function (_, compound) {
          return compound.translationKeys;
        },
        
        
        "FunctionDefinition": function (declSpecs, decl, stmt) {
          return [decl, stmt].translationKeys;
        },
        
        
        "Declaration": function(type, exp) {
          return exp.translationKeys;
        },
        "DeclarationExpression": function(declaratorList, _) {
          return declaratorList.translationKeys;
        },
        "InitDeclarator": function(declarator, _, initializer) {
          return initializer.translationKeys;
        },
        "TypeVariableDeclarator": function (spec, declarator) {
          return declarator.translationKeys;
        },
        "Declarator": function (_, decl) {
          return decl.translationKeys;
        },
        "DirectDeclarator_block": function (_, _, ident, _, params) {
          return null;
        },
        "DirectDeclarator_withDeclarator": function (_, decl, _, suffixes) {
          return [decl, suffixes].translationKeys;
        },
        "DirectDeclarator_withIdentifier": function (ident, suffixes) {
          return suffixes.translationKeys;
        },
        "DeclaratorSuffix": function (_, exp, _) {
          return exp.translationKeys;
        },
        
        
        "StructOrUnionSpecifier_withDeclaration": function (keyword, ident, _, decl, _) {
          return decl.translationKeys;
        },
        "StructOrUnionSpecifier_simple": function (keyword, ident) {
          return null;
        },
        "StructDeclarator_withConstant": function (decl, _, constantExp) {
          return null;
        },
        
        
        "EnumSpecifier_enumWithIdentifier": function (keyword, _, type, ident, _, list, _) {
          return null;
        },
        "EnumSpecifier_enum": function (keyword, _, type, _, list, _) {
          return null;
        },
        "EnumSpecifier_ns": function (keyword, _, type, _, ident, _, _, list, _) {
          return null;
        },
        "Enumerator": function (ident, _, constantExp) {
          return null;
        },
        
        
        "Pointer_compound": function (_, specs, ptr) {
          return null;
        },
        "Pointer_simple": function (_, spec) {
          return null;
        },
        
        
        "ParameterList": function (list, _, _) {
          return list.translationKeys;
        },
        "ParameterDeclaration": function (specs, exp) {
          return exp.translationKeys;
        },
        
        
        "Initializer_compound": function (_, list, _, _) {
          return list.translationKeys;
        },
        
        
        "TypeName_declaration": function (specList, decl) {
          return decl.translationKeys;
        },
        
        
        "AbstractDeclarator_compound": function (_, decl, _, suffix) {
          return [decl, suffix].translationKeys;
        },
        "AbstractDeclarator_constantExpression": function (_, constantExp, _) {
          return null;
        },
        "AbstractDeclarator_normal": function (ptr, decl) {
          return decl.translationKeys;
        },
        "AbstractDeclaratorSuffix": function (_, exp, _) {
          return exp.translationKeys;
        },
        
        
        "Statement_expression": function(stmt, _) {
          return stmt.translationKeys;
        },
        
        
        "LabeledStatement_default": function(_, _, stmt) {
          return stmt.translationKeys;
        },
        "LabeledStatement_case": function(_, exp, _, stmt) {
          var result = [exp, stmt].translationKeys;
          return result;
        },
        "LabeledStatement_identifier": function(ident, _, stmt) {
          return stmt.translationKeys;
        },
        
        
        "CompoundStatement": function(_, list, _) {
          return list.translationKeys;
        },
        
        
        "SelectionStatement_ifelse": function (_if, _, ifExp, _, ifStmt, _else, elseStmt) {
          return [ifExp, ifStmt, elseStmt].translationKeys;
        },
        "SelectionStatement_switch": function (_switch, _, exp, _, stmt) {
          return stmt.translationKeys;
        },
        "ForInStatement": function (_for, _, typeDecl, _in, exp, _, stmt) {
          return [exp, stmt].translationKeys;
        },
        "ForStatement": function (_for, _, forConditional, _, exp, _, additional, _, stmt) {
          return [forConditional, exp, additional, stmt].translationKeys;
        },
        "ForConditional_declaration": function (specs, decls) {
          return decls.translationKeys;
        },
        "WhileStatement": function (_while, _, exp, _, stmt) {
          return [exp, stmt].translationKeys;
        },
        "DoStatement": function (_do, stmt, _while, _, exp, _, _) {
          return [stmt, exp].translationKeys;
        },
        
        
        "JumpStatement_goto": function(keyword, ident, _) {
          return null;
        },
        "JumpStatement_return": function(keyword, exp, _) {
          return exp.translationKeys;
        },
        
        
        "AssignmentExpression_expression": function(unary, _, exp) {
          var result = [unary, exp].translationKeys;
          return result;
        },
        
        
        "ConditionalExpression": function(exp, _, a, _, b) {
          var result = [exp, a, b].translationKeys;
          return result;
        },
        
        
        "CastExpression_typed": function (_, type, _, exp) {
          return exp.translationKeys;
        },
        
        
        "UnaryExpression_preOpUnary": function (op, exp) {
          return exp.translationKeys;
        },
        "UnaryExpression_cast": function (op, castExp) {
          return castExp.translationKeys;
        },
        "UnaryExpression_sizeAndType": function (keyword, _, type, _) {
          return null;
        },
        "UnaryExpression_sizeAndExpression": function (keyword, exp) {
          return exp.translationKeys;
        },
        
        
        
        "PostfixExpression": function(primary, suffixes) {
          var primaryKeys = primary.translationKeys;
          var suffixKeys = suffixes.translationKeys;
          var result = primaryKeys;
          var subKeys = utils.collectTranslationKeysFromObjects(suffixKeys);
          if (subKeys) {
            result.subResults = subKeys;
          }
          var grammar = null;
          debugger;          
          
          if (primaryKeys instanceof Result 
            && primaryKeys.ctorName == "identifier" 
            && (grammar = this._semantics.grammar) 
            && grammar.match(primaryKeys.results[0], "macro").succeeded()
            && suffixKeys && suffixKeys.length > 0) {
            
            var suffixes = suffixKeys.flatten();
            if (!suffixes || suffixes.length === 0) {
              return result;
            }
            
            var label = null;
            var description = null;
            for (var i=0; i<suffixes.length; i++) {
              var suffix = suffixes[i];
              if (suffix.ctorName == "stringLiteral") {
                if (!label) {
                  label = suffix.results[0];
                }
                else if (!description) {
                  description = suffix.results[0];
                }
                else if (label && description) {
                  break;
                }
              }
            }
            if (label) {
              result = utils.createResult("translationKeys", utils.createTranslationKey(label, description), subKeys);
            }
            debugger;
          }
          return result;
        },
        "PostfixExpressionSuffix_expression": function(_, exp, _) {
          return exp.translationKeys;
        },
        "PostfixExpressionSuffix_argumentExpressionList": function(_, list, _) {
          return list.translationKeys;
        },
        "PostfixExpressionSuffix_dotIdent": function(_, identifier) {
          return null;
        },
        "PostfixExpressionSuffix_arrowIdent": function(_, identifier) {
          return null;
        },
        
        
        "decimalLiteral_nonZero": function(_, _, _) {
          return null;
        },
        "decimalLiteral_zero": function(_, _) {
          return null;
        }
        
      }
    }
  }
})()