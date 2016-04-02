<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tml" uri="/tml-tags"%>

<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" <tml:language_attributes/>>

<head>
<%@ include file="layout/head.jsp"%>
</head>

<body data-spy='scroll' data-target='#nav-categories'>
	<%@ include file="layout/navigation.jsp"%>
	
	<s:url value="/assets" var="style" htmlEscape="true"/>
	<div class="jumbotron text-center" style="background:url(${style}/images/hero.jpg) center center no-repeat;">
		<div class="container">
			<h1>
				<tml:tr>The Best in International Food</tml:tr>
			</h1>
			<p>
				<tml:tr>Food from around the world</tml:tr>
			</p>
		</div>
	</div>
	<div data-spy="affix" data-offset-top="480" class="recipe-nav">
		<div class="container text-centered">
			<div id="nav-categories">
				<ul class="nav nav-tabs">
					<c:forEach items="${categories}" var="category">
						<li><a href="#${category.id}"><tml:tr
									label="${category.name}" /></a></li>
					</c:forEach>
				</ul>
			</div>
		</div>
	</div>
	<div class="content">
		<div class="container">
			<c:forEach items="${categories}" var="category">
				<a id="${category.id}" class="anchor">&nbsp;</a>
				<div class="page-header">
					<h3>
						<tml:tr label="${category.name}" />
					</h3>
				</div>
				<div class="row">
					<div class="col-lg-10 col-lg-offset-1">
						<div class="row">
							<c:forEach items="${recipes_by_categories[category.id]}"
								var="recipe">
								<div class="col-lg-4 col-md-6">
									<a href="<s:url value="/recipe/${recipe.id}"/>"
										class="panel panel-default recipe-thumbnail"> <img
										src="<s:url value="/assets/${recipe.image}"/>" class="img-responsive">
										<div class="panel-body">
											<h4>
												<tml:tr label="${recipe.name}" />
											</h4>
											<p>
												<tml:tr label="${recipe.description}" />
											</p>
										</div>
									</a>
								</div>
							</c:forEach>
						</div>
					</div>
				</div>
			</c:forEach>
		</div>
	</div>

	<%@ include file="layout/footer.jsp"%>

</body>
</html>

